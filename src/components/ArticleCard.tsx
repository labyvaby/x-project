import type { Article } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { ARTICLES_I18N } from '../data/articles.i18n';

type Props = {
  article: Pick<Article, 'id' | 'title' | 'content'>;
  onRead: (id: string) => void;
};

export function ArticleCard({ article, onRead }: Props) {
  const { t, lang } = useI18n();
  const override = ARTICLES_I18N[article.id]?.[lang];
  const title = override?.title ?? article.title;
  const content0 = (override?.content ?? article.content)[0] ?? '';
  const snippet = content0.slice(0, 120);
  const hasMore = content0.length > 120;

  return (
    <article className="card article-card">
      <h4 className="card-title">{title}</h4>
      <p className="card-snippet">
        {snippet}
        {hasMore ? '…' : ''}
      </p>
      <div className="card-actions">
        <button onClick={() => onRead(article.id)}>{t('actions.readArticle')}</button>
      </div>
    </article>
  );
}
