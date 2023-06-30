const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const { Client } = require('./models/User'); // Replace with your user model
const secretKey = process.env.JWT_SECRET;


passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Assuming email is used for authentication
    },
    async (email, password, done) => {
      try {
        // Find the user in the database
        const user = await Client.findOne({ where: { email } });

        // If user is not found or password is incorrect, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // User authentication successful, return user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )

);
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey, // Replace with your own secret key
    },
    async (jwtPayload, done) => {
      try {
        const user = await Client.findByPk(jwtPayload.userId); // Replace with your user model and primary key
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


// Add serialization and deserialization functions if needed

module.exports = passport;
