import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const StoreConfig = (sequelize: Sequelize) => {
  class StoreConfig extends Model<
    InferAttributes<StoreConfig>,
    InferCreationAttributes<StoreConfig>
  > {
    declare key: string;
    declare value: number;

    static associate(models: any) {}
  }

  StoreConfig.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StoreConfig",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return StoreConfig;
};

export default StoreConfig;
