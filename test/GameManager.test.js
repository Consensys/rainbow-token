import assertRevert from './helpers/assertRevert';
const GameManager = artifacts.require('mocks/GameManagerMock');
const RainbowToken = artifacts.require('mocks/RainbowTokenMock');

const PLAYING_FEE = 1000000000000000;
const DEFAULT_BLENDING_PRICE = 10000000000000000;

const EVENT_NEW_GAME = 'NewGame';

contract('GameManager', function ([deployer, player1, player2, winningPlayer, gameManager, unknown]) {
    beforeEach(async function () {
        this.rgb = [128, 243, 2];
        this.gameManager = await GameManager.new(
          this.rgb[0],
          this.rgb[1],
          this.rgb[2],
          winningPlayer,
          {
              from: deployer,
          }
        );
    });

    describe('targetColor', function () {
        it('target color is set correctly', async function () {
            const targetColor = await Promise.all([
              this.gameManager.r(),
              this.gameManager.g(),
              this.gameManager.b()
            ])
            assert.equal(targetColor[0].toNumber(), this.rgb[0]);
            assert.equal(targetColor[1].toNumber(), this.rgb[1]);
            assert.equal(targetColor[2].toNumber(), this.rgb[2]);
        });
    });

    describe('gameAddress', function () {
        it('gameAddress is not zero', async function () {
            const gameAddress = await this.gameManager.gameAddress();
            assert.notStrictEqual(gameAddress, '0x0000000000000000000000000000000000000000');
        });
    });

    describe('claimVictory', function() {
      let initialGameAddress;
      beforeEach(async function() {
        initialGameAddress = await this.gameManager.gameAddress();
        this.game = await RainbowToken.at(initialGameAddress);
        await this.game.play({
            from: player1,
            value: PLAYING_FEE,
        })
      })

      it('reverts if sender is not a player', async function() {
        await assertRevert(this.gameManager.claimVictory({
            from: unknown,
        }));
      })

      it('reverts if sender is not a winner', async function() {
        await assertRevert(this.gameManager.claimVictory({
            from: player1,
        }));
      })

      describe('when claimVictory successful', function() {
        beforeEach(async function() {
          const { logs } = await this.gameManager.claimVictory({
              from: winningPlayer,
          });
          this.logs = logs;
        })

        it('modifies the address of the game', async function() {
          const gameAddress = await this.gameManager.gameAddress();
          assert.notStrictEqual(gameAddress, '0x0000000000000000000000000000000000000000');
          assert.notStrictEqual(gameAddress, initialGameAddress);
        })

        it('NewGame event is emitted', async function() {
          const gameAddress = await this.gameManager.gameAddress();
          assert.equal(this.logs.length, 1, 'Event is emitted');
          assert.equal(this.logs[0].event, EVENT_NEW_GAME, 'Event is correct');
          assert.equal(this.logs[0].args.newGameAddress, gameAddress, 'gameAddress arg is correct');
        })
      })
    })
});
