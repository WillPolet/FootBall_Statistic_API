Users :
{
    "_id": "<ObjectId>",
    "username": "<string>",
    "email": "<string>",
    "password": "<string>",
    "date_of_birth": "<date>",
    "created_at": "<date>",
    "updated_at": "<date>"
  }

  
Posts :

{
    "_id": "<ObjectId>",
    "user_id": "<ObjectId>", // Reference to Users
    "content": "<string>",
    "created_at": "<date>",
    "likes": ["<ObjectId>"], // Reference to Likes
    "comments": ["<ObjectId>"] // Reference to Comments
  }

  
Comments : 

{
    "_id": "<ObjectId>",
    "user_id": "<ObjectId>", // Reference to Users
    "post_id": "<ObjectId>", // Reference to Posts
    "content": "<string>",
    "created_at": "<date>"
  }


likes : 

{
    "_id": "<ObjectId>",
    "user_id": "<ObjectId>", // Reference to Users
    "post_id": "<ObjectId>" // Reference to Posts
  }
  