import { model, models, Schema, Types, Document } from "mongoose";

interface ThumbnailType extends Document {
  img: string;
  user: string | Types.ObjectId;
}

const thumbnailSchema = new Schema<ThumbnailType>({
  img: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Thumbnail =
  models.Thumbnail || model<ThumbnailType>("Thumbnail", thumbnailSchema);

export default Thumbnail;
