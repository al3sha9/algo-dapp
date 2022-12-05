import axios from "axios";

const validate_path = (challenge_id) =>
  `https://developer.algorand.org/api/challenges/${challenge_id}/verify/`;

async function validate(challenge_id, txIds) {
  const body = { transaction_ids: txIds };
  try {
    await axios.post(validate_path(challenge_id), body);
    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
  }
  return false;
}

const errorMapper = {
  // TODO: maybe with capture groups to slurp out which acct overspent?
  overspend: {
    re: /overspend/,
    message:
      "It looks you've tried to submit a transaction where an account did not have enough algos to complete the transaction.",
    docs: [
      "https://developer.algorand.org/docs/get-details/transactions/#fees",
      "https://developer.algorand.org/docs/get-details/accounts/#minimum-balance",
    ],
  },
  "asset overspend": {
    re: /underflow on subtracting/,
    message:
      "It looks like you've tried to submit a transaction where an account did not have enough of an asset to transfer.",
    docs: [
      // asset transfer
    ],
  },
  "opt in": {
    re: /receiver error: must optin,/,
    message:
      "It looks like you've tried to submit a transaction where the receiver has not yet opted in to the asset",
    docs: [
      // asset opt in
    ],
  },
  "wrong signer": {
    re: /should have been authorized by/,
    message:
      "It looks like you've tried to submit a transaction where the actual signer is different from the expected signer",
    docs: [
      // signing, auth addr, rekey
    ],
  },
};

function printError(error) {
  for (const [k, v] of Object.entries(errorMapper)) {
    if (v["re"].exec(error)) {
      console.error(v["message"]);
      console.error(v["docs"]);
      return;
    }
  }

  console.log("Unmapped error: " + error);
}

const algod = {
  // token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  // server: 'http://localhost',
  // port:  4001

  token: "",
  server: "https://testnet-api.algonode.cloud/",
  port: 0,
};

export { validate, printError, algod };