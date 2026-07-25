const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

interface CloudinaryUploadResponse {
    secure_url: string;
}

export const uploadService = {
    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            throw new Error(data.error?.message ?? "Качването на изображението неуспешно.");
        }

        return (data as CloudinaryUploadResponse).secure_url;
    },
};