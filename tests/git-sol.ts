import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";
import { GitSol } from "../target/types/git_sol";
import { airDropSol } from "./airdrop";

describe("git-sol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.GitSol as Program<GitSol>;

  it("create user", async () => {
    // Add your test here.
    const authority = Keypair.generate();
    await airDropSol(authority.publicKey, program);
    const [userPDA, userBump] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("user"), authority.publicKey.toBuffer()],
      program.programId
    );
    console.log("user pda ", userPDA.toBase58(), userBump);
    console.log(authority.publicKey.toString());
    try {
      const tx = await program.methods
        .createUser({
          name: "user",
          bio: "my bio",
          socialLinks: ["https://twitter.com/solana"],
        })
        .accounts({
          authority: authority.publicKey,
          userAccount: userPDA,
          systemProgram: SystemProgram.programId,
        })
        .signers([authority])
        .rpc();
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.log("Oops: ", error);
    }

    expect((await program.account.userAccount.fetch(userPDA)).name).to.equal(
      "user"
    );
    console.log(
      "User created:",
      await program.account.userAccount.fetch(userPDA)
    );
  });
});
