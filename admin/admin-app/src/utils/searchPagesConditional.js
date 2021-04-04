import { abtfrRestNonce, homeUrl } from './globalVars';

async function getJSON(url, namespace = 'wp/v2') {
  let headers = {
    'X-WP-Nonce': abtfrRestNonce
  };

  const response = await fetch(`${homeUrl}/wp-json/${namespace}/${url}`, {
    mode: 'cors',
    credentials: 'same-origin',
    headers
  });
  const result = await response.json();
  if (!response.ok) {
    if (result.message) {
      throw { _error: result.message };
    } else {
      throw { _error: `${response.status} ${response.statusText}` };
    }
  }
  return result;
}

const types = getJSON('types');
const tax = getJSON('taxonomies');

const makeLongLabel = (id, link, title) =>
  `${id}. ${link.replace(homeUrl, '')} - ${title}`;

export default async function searchPagesConditional(query = '', limit = 10) {
  if (limit < 10 || limit > 30) {
    limit = 10;
  }
  query = query.trim();

  try {
    const postTypes = await types;

    const results = [];

    for (const [post_type, { rest_base }] of Object.entries(postTypes)) {
      if (post_type === 'wp_block' || post_type === 'attachment') {
        continue;
      }
      if (results.length >= limit) {
        break;
      }

      // Get random post
      const posts = await getJSON(
        `${rest_base}?per_page=${limit}&search=${encodeURIComponent(
          query
        )}&_fields=id,link,title.rendered`
      );

      for (const post of posts) {
        if (post_type === 'page') {
          results.push({
            value: `is_${post_type}():${post.id}`,
            label: post.id,
            labellong: makeLongLabel(post.id, post.link, post.title.rendered),
            optgroup: 'page',
            class: 'page'
          });
        } else {
          results.push({
            value: `is_single():${post.id}`,
            label: post.id,
            labellong: makeLongLabel(post.id, post.link, post.title.rendered),
            optgroup: 'post',
            class: 'post'
          });
        }

        if (results.length >= limit) {
          break;
        }
      }
    }

    const taxonomies = await tax;

    for (const [taxonomy] of Object.entries(taxonomies)) {
      if (taxonomy === 'category') {
        continue;
      }
      if (results.length >= limit) {
        break;
      }

      if (['post_tag', 'product_cat', 'product_brand'].includes(taxonomy)) {
        const terms = await getJSON(
          `terms?taxonomy=${encodeURIComponent(
            taxonomy
          )}&limit=${limit}${query && `&query=${encodeURIComponent(query)}`}`,
          'abtfr/v1'
        );

        if (terms) {
          for (const term of terms) {
            if (taxonomy === 'post_tag') {
              results.push({
                value: `is_tax():${term.slug}`,
                label: `Tag: ${term.name}`,
                labellong: `Tag: ${makeLongLabel(
                  term.id,
                  term.link,
                  term.name
                )}`,
                optgroup: 'category',
                class: 'cat'
              });
            } else {
              results.push({
                value: `is_tax():${taxonomy}:${term.slug}`,
                label: `Term: ${taxonomy}/${term.name}`,
                labellong: `Term: ${makeLongLabel(
                  term.id,
                  term.link,
                  term.name
                )}`,
                optgroup: 'category',
                class: 'cat'
              });
            }

            if (results.length >= limit) {
              break;
            }
          }
        }
      }
    }

    return results;
  } catch (e) {
    return e;
  }
}

/*
        $taxonomies = get_taxonomies();
        if (!empty($taxonomies)) {
            foreach ($taxonomies as $taxonomy) {
                if (count($results) >= $limit) {
                    break;
                }
                switch ($taxonomy) {
                    case 'category':
                        // ignore
                        break;
                    case 'post_tag':
                    case 'product_cat':
                    case 'product_brand':
                        $terms = get_terms($taxonomy, array(
                            'orderby' => 'title',
                            'order' => 'ASC',
                            'number' => $limit,
                            'hide_empty' => false,
                            'name__like' => $query
                        ));
                        if ($terms) {
                            foreach ($terms as $term) {
                                switch ($taxonomy) {
                                    case 'product_cat':
                                    case 'product_brand':
                                        $results[] = array(
                                            'value' =>
                                                'is_tax():' .
                                                $taxonomy .
                                                ':' .
                                                $term->slug,
                                            'label' =>
                                                'Term: ' .
                                                $taxonomy .
                                                '/' .
                                                $term->name,
                                            'labellong' =>
                                                'Term: ' .
                                                $term->term_id .
                                                '. ' .
                                                str_replace(
                                                    home_url(),
                                                    '',
                                                    get_category_link(
                                                        $term->term_id
                                                    )
                                                ) .
                                                ' - ' .
                                                $term->name,
                                            'optgroup' => 'category',
                                            'class' => 'cat'
                                        );
                                        break;
                                    case 'post_tag':
                                        $results[] = array(
                                            'value' =>
                                                'is_tag():' . $term->slug,
                                            'label' => 'Tag: ' . $term->name,
                                            'labellong' =>
                                                'Tag: ' .
                                                $term->term_id .
                                                '. ' .
                                                str_replace(
                                                    home_url(),
                                                    '',
                                                    get_category_link(
                                                        $term->term_id
                                                    )
                                                ) .
                                                ' - ' .
                                                $term->name,
                                            'optgroup' => 'category',
                                            'class' => 'cat'
                                        );
                                        break;
                                    default:
                                        $results[] = array(
                                            'value' =>
                                                'is_tax():' .
                                                $taxonomy .
                                                ':' .
                                                $term->slug,
                                            'label' =>
                                                'Term: ' .
                                                $taxonomy .
                                                '/' .
                                                $term->name,
                                            'labellong' =>
                                                'Term: ' .
                                                $term->term_id .
                                                '. ' .
                                                str_replace(
                                                    home_url(),
                                                    '',
                                                    get_category_link(
                                                        $term->term_id
                                                    )
                                                ) .
                                                ' - ' .
                                                $term->name,
                                            'optgroup' => 'category',
                                            'class' => 'cat'
                                        );
                                        break;
                                }

                                if (count($results) >= $limit) {
                                    break;
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        if ($returnSingle) {
            return !empty($results) ? $results[0] : false;
        }

        $json = json_encode($results);

        header('Content-Type: application/json');
        header('Content-Length: ' . strlen($json));
        print $json;

        wp_die(); // this is required to terminate immediately and return a proper response
        */
