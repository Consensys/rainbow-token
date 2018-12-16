import eventParser from "./eventParser";
import callParser from "./callParser";
import transactionParser from "./transactionParser";

export { eventParser };

export default (abi, eth, methods, contractWs) => {
    const contract = {
        call: {},
        transactions: {},
        events: {}
    };

    // View functions
    const contractCalls = callParser(abi, methods);
    contract.call = { ...contractCalls };

    // Transactions
    const transactionFunctions = transactionParser(abi, methods, eth);
    contract.transactions = { ...transactionFunctions };

    // Events
    const contractEvents = eventParser(abi, contractWs);
    contract.events = { ...contractEvents };

    return contract;
};
