import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const ProductIngredient = (sequelize: Sequelize) => {
  class ProductIngredient extends Model<
    InferAttributes<ProductIngredient>,
    InferCreationAttributes<ProductIngredient>
  > {
    declare name: string;
    declare price: number;
    declare quantityOnHand: number;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {}
  }

  ProductIngredient.init(
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
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductIngredient",
    }
  );
  return ProductIngredient;
};

export default ProductIngredient;
