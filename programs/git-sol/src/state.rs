use anchor_lang::prelude::*;

#[account]
pub struct UserAccount {
    pub name: String,
    pub public_key: Pubkey,
    pub bio: String,
    pub social_links: Vec<String>,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct CreateUserInput {
    pub name: String,
    pub bio: String,
    pub social_links: Vec<String>,
}
