import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";
import { GitSol } from "../target/types/git_sol";
import { airDropSol } from "./airdrop";

describe("create repo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.GitSol as Program<GitSol>;

  true &&
    it("create repo", async () => {
      // Add your test here.
      const authority = Keypair.generate();
      await airDropSol(authority.publicKey, program, 10);
      const [userPDA, userBump] = await PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("user"),
          authority.publicKey.toBuffer(),
        ],
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
            avatar: "https://i.imgur.com/pYdbjrc.png",
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

      expect(
        (await program.account.userAccount.fetch(userPDA)).profileInfo.name
      ).to.equal("user");
      console.log(
        "User created:",
        await program.account.userAccount.fetch(userPDA)
      );

      const repo_id = (
        await program.account.userAccount.fetch(userPDA)
      ).repoCount.toNumber();
      console.log("repo id ", repo_id);
      const [repoPDA, repoBump] = await PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("repo"),
          authority.publicKey.toBuffer(),
          new anchor.BN(repo_id).toArrayLike(Buffer),
        ],
        program.programId
      );
      console.log("repo pda ", repoPDA.toBase58(), repoBump);
      try {
        const tx = await program.methods
          .createRepo({
            name: "repo",
            bio: "my repo bio",
            socialLinks: ["https://twitter.com/solana"],
            remote: "http://example.com/",
            avatar:
              "https://avatars.githubusercontent.com/u/93331018?s=200&v=4",
          })
          .accounts({
            repoAccount: repoPDA,
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

      expect(
        (await program.account.userAccount.fetch(userPDA)).repoCount.toNumber()
      ).to.equal(repo_id + 1);
      expect(
        (await program.account.repoAccount.fetch(repoPDA)).profileInfo.name
      ).to.equal("repo");
      console.log(
        "Repo created:",
        await program.account.repoAccount.fetch(repoPDA)
      );
      console.log(
        "User created:",
        await program.account.userAccount.fetch(userPDA)
      );
    });
});
