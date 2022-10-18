import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

const Hours = (sequelize: Sequelize) => {
  class Hours extends Model<InferAttributes<Hours>, InferCreationAttributes<Hours>> {
    declare accountId: number;
    declare minutesWorked: number;
    declare paid: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
  }

  Hours.init({
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutesWorked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Hours',
  })
  return Hours
}

export default Hours
