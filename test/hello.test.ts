import { test, expect } from 'vitest';
import {hello} from '../src/index'

test('hello',()=>{
    expect(hello()).toBe('Hello Karan')
})