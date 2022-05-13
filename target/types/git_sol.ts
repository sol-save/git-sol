export type GitSol = {
  "version": "0.1.0",
  "name": "git_sol",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createUserInput",
          "type": {
            "defined": "CreateUserInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateUserInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ]
};

export const IDL: GitSol = {
  "version": "0.1.0",
  "name": "git_sol",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createUserInput",
          "type": {
            "defined": "CreateUserInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateUserInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "socialLinks",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ]
};
