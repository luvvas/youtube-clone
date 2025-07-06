import { CategoriesSection } from "../sections/categories-section";

interface HomeViewProps {
    categoryId?: string;
}

export const HomeView = async ({ categoryId }: HomeViewProps) => {
    return (
        <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6 mt-2">
            <CategoriesSection categoryId={categoryId} />
            {/* <VideosSection /> */}
        </div>
    )
}