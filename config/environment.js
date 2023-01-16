

const development={
    name:'development',
    db:"mongodb://localhost/employee-review",
    google_client_id:"520516261986-dcme3ginp34rgsp95j89mdg8kb5t9mdu.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url:"http://localhost:8000/user/auth/google/callback",
}

const production={
    name:'production',
    db:process.env.ERS_DB,
    google_client_id:process.env.ERS_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.ERS_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.ERS_GOOGLE_CALLBACKURL,
}



module.exports=eval(process.env.ERS_ENVIRONMENT==undefined)?development:eval(process.env.ERS_ENVIRONMENT);