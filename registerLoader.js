import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('esmock', pathToFileURL('./'));
register('node-esm-loader', pathToFileURL('./'));