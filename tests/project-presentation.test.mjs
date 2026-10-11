import {test} from 'node:test';
import assert from 'node:assert/strict';
import {publicProjectStory} from '../src/lib/project-presentation.mjs';
test('retains facts and removes publishing notes',()=>assert.equal(publicProjectStory('A completed renovation in Kotte. This bathroom was previously shown under a design name. It is now presented under its real project identity. The detailed scope, investment, testing record and handover notes will be added from the original project file.'),'A completed renovation in Kotte.'));
test('does not alter detailed project records',()=>assert.equal(publicProjectStory('The project cost LKR 1,881,000. Plumbing testing passed.'),'The project cost LKR 1,881,000. Plumbing testing passed.'));
