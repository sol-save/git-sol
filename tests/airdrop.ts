import { Program } from "@project-serum/anchor";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { GitSol } from "../target/types/git_sol";

export const airDropSol = async (
  pubkey: PublicKey,
  program: Program<GitSol>,
  amt: number
) => {
  try {
    const fromAirDropSignature =
      await program.provider.connection.requestAirdrop(
        pubkey,
        amt * LAMPORTS_PER_SOL
      );
    const ar_tx = await program.provider.connection.confirmTransaction(
      fromAirDropSignature
    );
    console.log("success", ar_tx, fromAirDropSignature);
  } catch (er) {
    console.log("Error Here: " + er);
  }
};
