import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { artifact } from '$lib/server/artifact.ts';
import { buildPageModel } from '$lib/sections/model.ts';

/**
 * The CV: the same page model as `/`, laid out for one A4 sheet. `bun content:render` prints it;
 * `?target=<name>` picks a variant from the Person's `cv.targets`.
 */
export const load: PageServerLoad = ({ url }) => {
  const model = buildPageModel(artifact.nodes, artifact.edges);
  const { targets, ...base } = model.person.cv;
  const target = url.searchParams.get('target');
  if (target !== null && !Object.hasOwn(targets, target)) error(404, `No CV target "${target}"`);
  return { model, cv: target === null ? base : targets[target]! };
};
