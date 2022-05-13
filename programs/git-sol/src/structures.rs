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
