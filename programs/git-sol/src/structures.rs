use crate::state::*;
use anchor_lang::prelude::*;
#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(init,seeds = [b"user", authority.key().as_ref()], bump,payer=authority,space=9000)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateRepo<'info> {
    #[account(init,seeds = [b"repo", authority.key().as_ref(),&[user_account.repo_count as u8]], bump,payer=authority,space=9000)]
    pub repo_account: Account<'info, RepoAccount>,

    #[account(mut,seeds = [b"user", user_account.owner.key().as_ref()], bump= user_account.bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateCommit<'info> {
    #[account(mut,seeds = [b"repo", authority.key().as_ref(),&[user_account.repo_count as u8]], bump= repo_account.bump)]
    pub repo_account: Account<'info, RepoAccount>,

    #[account(mut,seeds = [b"user", user_account.owner.key().as_ref()], bump= user_account.bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
