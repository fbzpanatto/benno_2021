module.exports = {
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "fnp181292",
    database: "benno",
    define: {
        timestamps: true,
        underscored: true,
    },
    jwtSecret: '9cafd502dc7fd49c94b6078b8f5a12ec',
    jwtSession: { session: false }
}