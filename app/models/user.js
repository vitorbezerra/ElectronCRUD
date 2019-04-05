module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    t_consumed: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      createdAt: false,
      updatedAt: false,
    })

  return Users
}