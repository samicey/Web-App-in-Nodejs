const express = require("express");
const authRouter = require("express").Router();
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:authRoutes");
const passport = require('passport')

function router(nav) {
  authRouter.route("/signUp").post((req, res) => {
    
    const {username, password } = req.body;
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    ( async function addUser(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = await client.db(dbName);

        const col = await db.collection('users');
        const user = { username, password };

        const results = await col.insertOne(user);

        req.login(results.ops[0], () => {
          res.redirect("/auth/profile");
        });
      } catch (error) {
        debug(error)
      }
    }())
    debug(req.body);
    
  });

  authRouter.route('/signin')
        .get((req,res)=>{
          res.render('signIn',{
            nav,
            title: 'Sign In'
          });
        })
        .post(passport.authenticate('local',{
          successRedirect:'/auth/profile',
          failureRedirect: '/'
        }));
  authRouter.route("/profile").get((req, res) => {
    res.json(req.user);
  });
  return authRouter;
}

module.exports = router;
