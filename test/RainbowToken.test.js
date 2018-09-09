import assertRevert from './helpers/assertRevert';
const RainbowToken = artifacts.require('mocks/RainbowTokenMock');

const PLAYING_FEE = 1000000000000000;
const DEFAULT_BLENDING_PRICE = 10000000000000000;

const EVENT_PLAYER_CREATED = 'PlayerCreated';
const EVENT_BLENDING_PRICE_SET = 'BlendingPriceSet';
const EVENT_TOKEN_BLENDED = 'TokenBlended';
const EVENT_PLAYER_WON = 'PlayerWon';

contract('RainbowToken', function ([player1, player2, winningPlayer, unknown]) {
    beforeEach(async function () {
        this.rgb = [128, 243, 2];
        this.game = await RainbowToken.new(
            this.rgb[0],
            this.rgb[1],
            this.rgb[2],
            {
                from: winningPlayer,
                value: PLAYING_FEE,
            });
    });

    describe('targetColor', function () {
        it('target color is set correctly', async function () {
            const targetColor = await this.game.targetColor();
            assert.equal(targetColor[0].toNumber(), this.rgb[0]);
            assert.equal(targetColor[1].toNumber(), this.rgb[1]);
            assert.equal(targetColor[2].toNumber(), this.rgb[2]);
        });
    });

    describe('getPlayers', function () {
        it('only winning player is registered', async function () {
            const players = await this.game.getPlayers();
            assert.lengthOf(players, 1);
            assert.equal(players[0], winningPlayer);
        });
    });


    describe('play', function () {
        it('revert if playing fee is too low', async function () {
            await assertRevert(this.game.play({
                from: player1,
                value: PLAYING_FEE - 1,
            }));
        });

        describe('when playing successful', function () {
            beforeEach(async function () {
                this.initialRainbowBalance = await web3.eth.getBalance(this.game.address);
                const { logs } = await this.game.play({
                    from: player1,
                    value: PLAYING_FEE,
                });
                this.logs = logs;
            });

            it('rainbow token contract received playing fee', async function () {
                const finalRainbowBalance = await web3.eth.getBalance(this.game.address);
                assert.equal(finalRainbowBalance.toNumber(), this.initialRainbowBalance.toNumber() + PLAYING_FEE);
            });

            it('player is correctly registered', async function () {
                const isPlayer = await this.game.isPlayer(player1);
                assert.isTrue(isPlayer);
            });

            it('PlayerCreated event is emitted', async function () {
                assert.equal(this.logs.length, 1, 'Event is emitted');
                assert.equal(this.logs[0].event, EVENT_PLAYER_CREATED, 'Event is correct');
                assert.equal(this.logs[0].args.player, player1, 'player arg is correct');
                assert.equal(this.logs[0].args.blendingPrice, DEFAULT_BLENDING_PRICE, 'blendingPrice arg is correct');
            });

            it('player token has default values', async function () {
                const token = await this.game.getToken(player1);
                assert.equal(token[6].toNumber(), DEFAULT_BLENDING_PRICE, 'blending price is default');
                assert.include([0, 255], token[0].toNumber(), 'r is 0 or 255');
                assert.equal(token[0].toNumber(), token[3].toNumber());
                assert.include([0, 255], token[1].toNumber(), 'g is 0 or 255');
                assert.equal(token[1].toNumber(), token[4].toNumber());
                assert.include([0, 255], token[2].toNumber(), 'g is 0 or 255');
                assert.equal(token[2].toNumber(), token[5].toNumber());
            });

            it('revert if player tries to play a second time', async function () {
                await assertRevert(this.game.play({
                    from: player1,
                    value: PLAYING_FEE,
                }));
            });
        });
    });

    describe('setBlendingPrice', function () {
        beforeEach(async function () {
            await this.game.play({
                from: player1,
                value: PLAYING_FEE,
            });
        });

        it('revert if not a player', async function () {
            await assertRevert(this.game.setBlendingPrice(0, {
                from: unknown,
            }));
        });

        it('revert if new price is 0', async function () {
            await assertRevert(this.game.setBlendingPrice(0, {
                from: player1,
            }));
        });

        describe('when new price is correct', function () {
            beforeEach(async function () {
                const { logs } = await this.game.setBlendingPrice(12354728024758, {
                    from: player1,
                });
                this.logs = logs;
            });

            it('token price is set', async function () {
                const token = await this.game.getToken(player1);
                assert.equal(token[6].toNumber(), 12354728024758, 'Token price is new price');
            });

            it('BlengingPriceSet event emmited', async function () {
                assert.equal(this.logs.length, 1, 'Event is emitted');
                assert.equal(this.logs[0].event, EVENT_BLENDING_PRICE_SET, 'Event is correct');
                assert.equal(this.logs[0].args.player, player1, 'Player arg is correct');
                assert.equal(this.logs[0].args.price, 12354728024758, 'BlendingPrice arg is correct');
            });
        });
    });

    describe('blend', function () {
        beforeEach(async function () {
            await this.game.play({
                from: player1,
                value: PLAYING_FEE,
            });
            this.blendingPrice = 12354728024758;
            await this.game.setBlendingPrice(this.blendingPrice, {
                from: winningPlayer,
            });
        });

        it('revert if not blending with a player', async function () {
            const blendingToken = await this.game.getToken(winningPlayer);
            await assertRevert(this.game.blend(
                unknown,
                blendingToken[6],
                blendingToken[0],
                blendingToken[1],
                blendingToken[2],
                {
                    from: player1,
                    value: blendingToken[6],
                }
            ));
        });

        it('revert if blending price too low', async function () {
            const blendingToken = await this.game.getToken(winningPlayer);
            await assertRevert(this.game.blend(
                winningPlayer,
                blendingToken[6],
                blendingToken[0],
                blendingToken[1],
                blendingToken[2],
                {
                    from: player1,
                    value: blendingToken[6] - 1,
                }
            ));
        });

        it('revert if blending price increased', async function () {
            const blendingToken = await this.game.getToken(winningPlayer);
            await this.game.setBlendingPrice(blendingToken[6] + 1, {
                from: winningPlayer,
            });
            await assertRevert(this.game.blend(
                winningPlayer,
                blendingToken[6],
                blendingToken[0],
                blendingToken[1],
                blendingToken[2],
                {
                    from: player1,
                    value: blendingToken[6],
                }
            ));
        });

        describe('when successful blending', function () {
            beforeEach(async function () {
                this.initialBlengingPlayerBalance = await web3.eth.getBalance(winningPlayer);
                this.initialRainbowBalance = await web3.eth.getBalance(this.game.address);
                this.initialToken = await this.game.getToken(player1);
                this.blendingToken = await this.game.getToken(winningPlayer);
                const { logs } = await this.game.blend(
                    winningPlayer,
                    this.blendingToken[6],
                    this.blendingToken[0],
                    this.blendingToken[1],
                    this.blendingToken[2],
                    {
                        from: player1,
                        value: this.blendingToken[6],
                    }
                );
                this.logs = logs;
            });

            it('token color changed', async function () {
                const token = await this.game.getToken(player1);
                assert.equal(
                    token[0].toNumber(),
                    Math.floor((this.initialToken[0].toNumber() + this.blendingToken[0].toNumber()) / 2)
                );
                assert.equal(
                    token[1].toNumber(),
                    Math.floor((this.initialToken[1].toNumber() + this.blendingToken[1].toNumber()) / 2)
                );
                assert.equal(
                    token[2].toNumber(),
                    Math.floor((this.initialToken[2].toNumber() + this.blendingToken[2].toNumber()) / 2)
                );
            });

            it('fees have been correctly transfered', async function () {
                const finalBlendingPlayerBalance = await web3.eth.getBalance(winningPlayer);
                const finalRainbowBalance = await web3.eth.getBalance(this.game.address);
                const blendingPlayerFee = Math.floor(this.blendingToken[6] / 2);
                const rainbowFee = this.blendingToken[6] - blendingPlayerFee;
                assert.equal(finalRainbowBalance.sub(this.initialRainbowBalance).sub(rainbowFee).toNumber(), 0);
                assert.equal(
                    finalBlendingPlayerBalance.sub(this.initialBlengingPlayerBalance).sub(blendingPlayerFee).toNumber(),
                    0
                );
            });

            it('TokenBlended event emmited', async function () {
                const token = await this.game.getToken(player1);
                assert.equal(this.logs.length, 1, 'Event is emitted');
                assert.equal(this.logs[0].event, EVENT_TOKEN_BLENDED, 'Event is correct');
                assert.equal(this.logs[0].args.player, player1, 'Player arg is correct');
                assert.equal(this.logs[0].args.r, token[0].toNumber(), 'R is correct');
                assert.equal(this.logs[0].args.g, token[1].toNumber(), 'G is correct');
                assert.equal(this.logs[0].args.b, token[2].toNumber(), 'B is correct');
            });
        });

        it('revert if blending color does not match arguments', async function () {
            const blendingToken = await this.game.getToken(winningPlayer);
            await assertRevert(this.game.blend(
                winningPlayer,
                blendingToken[6],
                124,
                148,
                253,
                {
                    from: player1,
                    value: blendingToken[6],
                }
            ));
        });
    });

    describe('defaultBlend', function () {
        beforeEach(async function () {
            await this.game.play({
                from: player1,
                value: PLAYING_FEE,
            });

            // Change token color
            const blendingToken = await this.game.getToken(winningPlayer);
            await this.game.blend(
                winningPlayer,
                blendingToken[6],
                blendingToken[0],
                blendingToken[1],
                blendingToken[2],
                {
                    from: player1,
                    value: blendingToken[6],
                }
            );
        });

        it('revert if not a player', async function () {
            await assertRevert(this.game.defaultBlend(
                {
                    from: unknown,
                    value: DEFAULT_BLENDING_PRICE,
                }
            ));
        });

        it('revert if blending price is too low', async function () {
            await assertRevert(this.game.defaultBlend(
                {
                    from: player1,
                    value: DEFAULT_BLENDING_PRICE - 2, // Strange behavior when doing -1
                }
            ));
        });

        describe('when successful blending', function () {
            beforeEach(async function () {
                this.initialRainbowBalance = await web3.eth.getBalance(this.game.address);
                this.initialToken = await this.game.getToken(player1);
                const { logs } = await this.game.defaultBlend(
                    {
                        from: player1,
                        value: DEFAULT_BLENDING_PRICE,
                    }
                );
                this.logs = logs;
            });

            it('token color changed', async function () {
                const token = await this.game.getToken(player1);
                assert.equal(
                    token[0].toNumber(),
                    Math.floor((this.initialToken[0].toNumber() + this.initialToken[3].toNumber()) / 2)
                );
                assert.equal(
                    token[1].toNumber(),
                    Math.floor((this.initialToken[1].toNumber() + this.initialToken[4].toNumber()) / 2)
                );
                assert.equal(
                    token[2].toNumber(),
                    Math.floor((this.initialToken[2].toNumber() + this.initialToken[5].toNumber()) / 2)
                );
            });

            it('TokenBlended event emmited', async function () {
                const token = await this.game.getToken(player1);
                assert.equal(this.logs.length, 1, 'Event is emitted');
                assert.equal(this.logs[0].event, EVENT_TOKEN_BLENDED, 'Event is correct');
                assert.equal(this.logs[0].args.player, player1, 'Player arg is correct');
                assert.equal(this.logs[0].args.r, token[0].toNumber(), 'R is correct');
                assert.equal(this.logs[0].args.g, token[1].toNumber(), 'G is correct');
                assert.equal(this.logs[0].args.b, token[2].toNumber(), 'B is correct');
            });
        });
    });

    describe('claimVictory', function () {
        beforeEach(async function () {
            await this.game.play({
                from: player1,
                value: PLAYING_FEE,
            });
        });

        it('revert if not a player', async function () {
            await assertRevert(this.game.claimVictory(
                {
                    from: unknown,
                }
            ));
        });

        it('revert if not winner', async function () {
            await assertRevert(this.game.claimVictory(
                {
                    from: player1,
                }
            ));
        });

        describe('when successful winning claimed', function () {
            beforeEach(async function () {
                this.initialRainbowBalance = await web3.eth.getBalance(this.game.address);
                this.initialWinnerBalance = await web3.eth.getBalance(winningPlayer);
                this.receipt = await this.game.claimVictory({
                    from: winningPlayer,
                    gasPrice: 0,
                });
            });

            it('rainbow token balance has been transfered to winner', async function () {
                const finalRainbowBalance = await web3.eth.getBalance(this.game.address);
                const finalWinnerBalance = await web3.eth.getBalance(winningPlayer);

                assert.equal(finalRainbowBalance.toNumber(), 0);
                assert.equal(
                    finalWinnerBalance.sub(this.initialWinnerBalance).sub(this.initialRainbowBalance).toNumber(),
                    0
                );
            });

            describe('Game should be over', function () {
                it('gameOver should be set to false', async function () {
                    const gameOver = await this.game.gameOver();
                    assert.isTrue(gameOver);
                });

                describe('Methods should be innaccessible', function () {
                    it('play', async function () {
                        await assertRevert(this.game.play({
                            from: player2,
                            value: PLAYING_FEE,
                        }));
                    });

                    it('blend', async function () {
                        this.blendingToken = await this.game.getToken(winningPlayer);
                        await assertRevert(this.game.blend(
                            winningPlayer,
                            this.blendingToken[6],
                            this.blendingToken[0],
                            this.blendingToken[1],
                            this.blendingToken[2],
                            {
                                from: player1,
                                value: this.blendingToken[6],
                            }
                        ));
                    });

                    it('defaultBlend', async function () {
                        await assertRevert(this.game.defaultBlend({
                            from: player1,
                            value: DEFAULT_BLENDING_PRICE,
                        }
                        ));
                    });

                    it('claimVictory', async function () {
                        await assertRevert(this.game.claimVictory({
                            from: winningPlayer,
                        }
                        ));
                    });
                });
            });

            it('PlayerWon event emmited', async function () {
                const logs = this.receipt.logs;
                assert.equal(logs.length, 1, 'Event is emitted');
                assert.equal(logs[0].event, EVENT_PLAYER_WON, 'Event is correct');
                assert.equal(logs[0].args.player, winningPlayer, 'Player arg is correct');
            });
        });
    });
});
