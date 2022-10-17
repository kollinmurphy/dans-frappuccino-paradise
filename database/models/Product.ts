import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";


const Product = (sequelize: Sequelize) => {
    class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
        declare name: string;
        declare imageUrl: string;
        declare isDeleted: boolean;
        declare createdAt: Date;
        declare updatedAt: Date;


        static associate(models:any){
            models.Product.hasMany(models.ProductIngredient)
        }
    }

    Product.init({
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Product',
    })
    return Product

}

export default Product
