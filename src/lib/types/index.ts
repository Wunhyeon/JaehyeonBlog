export type category =
  | {
      created_at: string;
      deleted_at: string | null;
      id: string;
      name_en: string | null;
      name_kr: string | null;
      parents_id: string | null;
      updated_at: string;
      content_category: {
        created_at: string;
        deleted_at: string | null;
        id: string;
        name_en: string | null;
        name_kr: string | null;
        parents_id: string | null;
        updated_at: string;
      } | null;
    }[]
  | null;
