import { CategoryRepository } from "#category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "#core/domain/repository/in-memory.repository";
import { Category } from "#category/domain/entities/category";
import { SortDirection } from "#core/domain/repository/repository-contracts";

export class CategoryInMemoryRepository
    extends InMemorySearchableRepository<Category>
    implements CategoryRepository.Repository {
    sortableFields: string[] = ["name", "created_at"];

    protected async applyFilter(
        items: Category[],
        filter: CategoryRepository.Filter
    ): Promise<Category[]> {
        if (!filter) {
            return items;
        }

        return items.filter(item => {
            return item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
        });
    }

    protected async applySort(
        items: Category[],
        sort: string | null,
        sort_dir: SortDirection | null
    ): Promise<Category[]> {
        if (!sort) {
            return super.applySort(items, "created_at", "desc");
        }
        return super.applySort(items, sort, sort_dir);
    }
}