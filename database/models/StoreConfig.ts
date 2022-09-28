import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

const StoreConfig = (sequelize: Sequelize) => {
    class StoreConfig extends Model<InferAttributes<StoreConfig>, InferCreationAttributes<StoreConfig>> {
    
    declare key: string;
    declare value: number;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
    }
  }

    StoreConfig.init({
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'StoreConfig',
  })
    return StoreConfig
}

export default StoreConfig
