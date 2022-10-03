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
    declare ingredientId: number;
    declare productId: number;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {}
  }

  ProductIngredient.init(
    {
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
