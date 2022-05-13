use anchor_lang::prelude::*;

// ACCOUNTS
#[account]
pub struct UserAccount {
    pub bump: u8,
    pub repo_count: u128,
    pub profile_info: ProfileInfo,
    pub public_key: Pubkey,
    pub owner: Pubkey,
}

#[account]
pub struct RepoAccount {
    pub public_key: Pubkey,
    pub owner: Pubkey,
    pub profile_info: ProfileInfo,
    pub bump: u8,
    pub repo_id: u128,
    pub remote: String,
    pub commits: Vec<Commit>,
}
// STRUCTS
#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct Commit {
    pub id: u128,
    pub timestamp: String,
    pub hash: String,
}
#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct ProfileInfo {
    pub name: String,
    pub bio: String,
    pub social_links: Vec<String>,
    pub avatar: String,
}

// INPUTS
#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct CreateRepoInput {
    pub name: String,
    pub bio: String,
    pub social_links: Vec<String>,
    pub avatar: String,
    pub remote: String,
}
#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct CreateUserInput {
    pub name: String,
    pub bio: String,
    pub social_links: Vec<String>,
    pub avatar: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct AddCommitInput {
    pub timestamp: String,
    pub hash: String,
}
