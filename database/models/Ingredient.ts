import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const Ingredient = (sequelize: Sequelize) => {
  class Ingredient extends Model<
    InferAttributes<Ingredient>,
    InferCreationAttributes<Ingredient>
  > {
    declare name: string;
    declare price: number;
    declare quantityOnHand: number;
    declare hidden: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
  }

  Ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      quantityOnHand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};

export default Ingredient;
