type ComponentProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: ComponentProps) => {
  const numPages = Math.ceil(total / perPage);

  const pages: number[] = [];

  for (let i = 0; i < numPages; i++) {
    pages.push(i + 1);
  }

  const items = [];

  for (
    let i = (currentPage - 1) * perPage + 1;
    i <= currentPage * perPage && i <= total;
    i++
  ) {
    items.push({ id: i, text: `Item ${i}` });
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 || numPages === 0 ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange((currentPage || 1) - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          const isActive = page === currentPage;

          return (
            <li
              key={page}
              className={isActive ? 'page-item li.active' : 'page-item'}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  if (page !== currentPage) {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === numPages || numPages === 0 ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={(currentPage || 1) === numPages ? 'true' : 'false'}
            onClick={() => onPageChange((currentPage || 1) + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => {
          return (
            <li key={item.id} data-cy="item">
              {item.text}
            </li>
          );
        })}
      </ul>
    </>
  );
};
