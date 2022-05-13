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
        } = create_user_input;
        ctx.accounts.user_account.bump = *ctx.bumps.get("user_account").unwrap();
        ctx.accounts.user_account.bio = bio;
        ctx.accounts.user_account.name = name;
        ctx.accounts.user_account.social_links = social_links;
        Ok(())
    }
}
