export const createSlug = (name) => {
    let slug = name.toLowerCase();
    slug = slug.replace(/\s+/g, '-');
    slug = slug.replace(/[^\w-]/g, '');
    return slug;
};


