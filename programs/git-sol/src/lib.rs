use anchor_lang::prelude::*;
mod state;
mod structures;
use crate::state::*;
use crate::structures::*;
declare_id!("7PsWEzPcGpdUWdVE4ogMiV9xCKeyjPBsxHcchotwx4cX");

#[program]
pub mod git_sol {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, create_user_input: CreateUserInput) -> Result<()> {
        let CreateUserInput {
            name,
            bio,
            social_links,
            avatar,
        } = create_user_input;
        ctx.accounts.user_account.bump = *ctx.bumps.get("user_account").unwrap();
        ctx.accounts.user_account.profile_info.bio = bio;
        ctx.accounts.user_account.profile_info.name = name;
        ctx.accounts.user_account.profile_info.avatar = avatar;
        ctx.accounts.user_account.profile_info.social_links = social_links;
        ctx.accounts.user_account.owner = ctx.accounts.authority.key();
        ctx.accounts.user_account.public_key = ctx.accounts.user_account.key();
        ctx.accounts.user_account.repo_count = 0;
        Ok(())
    }
    pub fn create_repo(ctx: Context<CreateRepo>, create_user_input: CreateRepoInput) -> Result<()> {
        let CreateRepoInput {
            name,
            bio,
            social_links,
            avatar,
            remote,
        } = create_user_input;
        ctx.accounts.repo_account.profile_info = ProfileInfo {
            avatar,
            bio,
            name,
            social_links,
        };
        ctx.accounts.repo_account.remote = remote;
        ctx.accounts.repo_account.bump = *ctx.bumps.get("repo_account").unwrap();
        ctx.accounts.repo_account.repo_id = ctx.accounts.user_account.repo_count;

        ctx.accounts.user_account.repo_count += 1;

        ctx.accounts.repo_account.owner = ctx.accounts.authority.key();
        Ok(())
    }
    pub fn add_commit(ctx: Context<AddCommit>, create_commit_input: AddCommitInput) -> Result<()> {
        let AddCommitInput { timestamp, hash } = create_commit_input;
        let id = ctx.accounts.repo_account.commits.len() as u128;
        let commit: Commit = Commit {
            timestamp,
            hash,
            id,
        };
        ctx.accounts.repo_account.commits.push(commit);
        require_eq!(ctx.accounts.repo_account.commits.len() as u128, id + 1);
        Ok(())
    }
}
