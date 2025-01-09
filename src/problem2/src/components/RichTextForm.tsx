import { type FC, useEffect } from "react";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

export type TOptions = {
  label: string;
  value: string;
  icon: FC;
};

export const tagOptions: TOptions[] = [
  { label: "Turquoise", value: "Turquoise", icon: Turtle },
  { label: "Green", value: "Green", icon: Cat },
  { label: "Purple", value: "Purple", icon: Dog },
  { label: "Crimson", value: "Crimson", icon: Rabbit },
  { label: "Pink", value: "Pink", icon: Fish },
  { label: "Indigo", value: "Indigo", icon: Turtle },
  { label: "Orange", value: "Orange", icon: Cat },
  { label: "Mauv", value: "Mauv", icon: Dog },
  { label: "Teal", value: "Teal", icon: Rabbit },
  { label: "Blue", value: "Blue", icon: Fish },
  { label: "Red", value: "Red", icon: Turtle },
];

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  description: z.string().nonempty("Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  image: z.string().url("Invalid URL").nonempty("Image URL is required"),
});
interface FormData {
  title: string;
  content: string;
  description: string;
  tags: string[];
  image: string;
}

interface RichTextFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
}

const RichTextForm: FC<RichTextFormProps> = ({ initialData, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              placeholder="Enter title"
              {...field}
              aria-invalid={errors.title ? "true" : "false"}
            />
          )}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              placeholder="Enter a brief description"
              {...field}
              aria-invalid={errors.description ? "true" : "false"}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="tags">Tags</Label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <MultiSelect
              id="tags"
              {...field}
              defaultValue={initialData.tags}
              options={tagOptions}
              onValueChange={field.onChange}
              placeholder="Select tags"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          )}
        />
        {errors.tags && (
          <p className="text-sm text-red-500">{errors.tags.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Input
              id="image"
              type="url"
              placeholder="Enter image URL"
              {...field}
              aria-invalid={errors.image ? "true" : "false"}
            />
          )}
        />
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default RichTextForm;
