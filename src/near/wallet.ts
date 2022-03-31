import * as constants from "./constants.js";
import NEAR from "./near";

export async function connect() {
  const keyStore = new NEAR.keyStores.BrowserLocalStorageKeyStore();
  const near = await NEAR.connect(constants.config(keyStore));
  const wallet = new NEAR.WalletConnection(near, null);
  return { near, wallet };
}

export function signIn(wallet) {
  wallet.requestSignIn();
}

export function signOut(wallet) {
  console.log("SIGNOUT ", wallet);
  wallet.signOut();
}
