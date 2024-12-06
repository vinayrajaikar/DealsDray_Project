import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema(
    {
        adminName: {
            type: String,
            default:"Vinay"

        },
        password: {
            type: String,
            default:"123"
        },

    }
)

export const Admin = mongoose.model("Admin", adminSchema);



