export type CreateCategoryInput = {
    name: string;
    description?: string;
    is_active?: boolean;
}

export type GetCategoryInput = {
    id: string;
}

export type UpdateCategoryInput = {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
}