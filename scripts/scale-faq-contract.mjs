import fs from 'node:fs';

export const SCALE_FAQ_SUPPLEMENT_PATH = 'docs/content/site-master/A-Scales/launch-monetization/faq-answer-supplement.json';

export function loadScaleFaqSupplement(path = SCALE_FAQ_SUPPLEMENT_PATH) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function attachScaleFaqSupplement(pages, supplement = loadScaleFaqSupplement()) {
  assert(supplement?.format === 'proposed-keyed-faq-supplement-v1-NOT-runtime-import', 'faq supplement: unsupported format');
  const next = { ...pages };
  for (const route of supplement.routes ?? []) {
    if (!Object.hasOwn(next, route.url)) continue;
    const page = next[route.url];
    assert(Array.isArray(page.questions), `pages.${route.url}.questions: must be an array`);
    assert(Array.isArray(route.items), `faq supplement ${route.url}: items must be an array`);
    assert(route.items.length === page.questions.length, `faq supplement ${route.url}: expected ${page.questions.length} answers, received ${route.items.length}`);
    const ids = new Set();
    const faqs = route.items.map((item, index) => {
      assert(item.original_question_index === index, `faq supplement ${route.url}[${index}]: question index mismatch`);
      assert(item.question === page.questions[index], `faq supplement ${route.url}[${index}]: question text mismatch`);
      assert(typeof item.id === 'string' && item.id.length > 0 && !ids.has(item.id), `faq supplement ${route.url}[${index}]: invalid or duplicate id`);
      assert(typeof item.answer_en === 'string' && item.answer_en.trim(), `faq supplement ${route.url}[${index}]: answer is required`);
      ids.add(item.id);
      return {
        id: item.id,
        question: item.question,
        answer: item.answer_en,
        source_ids: [...route.source_ids],
        evidence_status: item.evidence_status,
      };
    });
    next[route.url] = { ...page, faqs };
  }
  return next;
}

export function validateScaleFaqsForPage(page, sourceIDs) {
  if (!page.faqs) return { count: 0, explicit: false };
  assert(Array.isArray(page.questions), `pages.${page.url}.questions: must be an array`);
  assert(Array.isArray(page.faqs), `pages.${page.url}.faqs: must be an array`);
  assert(page.faqs.length === page.questions.length, `pages.${page.url}.faqs: must match all ${page.questions.length} questions`);
  const ids = new Set();
  page.faqs.forEach((faq, index) => {
    const path = `pages.${page.url}.faqs[${index}]`;
    assert(typeof faq.id === 'string' && faq.id.length > 0 && !ids.has(faq.id), `${path}.id: must be stable and unique`);
    assert(faq.question === page.questions[index], `${path}.question: must match questions[${index}] exactly`);
    assert(typeof faq.answer === 'string' && faq.answer.trim(), `${path}.answer: must be explicit`);
    assert(Array.isArray(faq.source_ids) && faq.source_ids.length > 0, `${path}.source_ids: must bind the answer to source records`);
    faq.source_ids.forEach((id) => assert(sourceIDs.has(id), `${path}.source_ids: unknown source id ${id}`));
    ids.add(faq.id);
  });
  return { count: page.faqs.length, explicit: true };
}
