import React from 'react';

import { render, within, screen } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals'
import events from '@testing-library/user-event';

describe('Simple Test Case', () => {
    it('Should return 4', () => {
        const app = <div>example</div>;

        const { container } = render(app);

        console.log(container.outerHTML);

        expect(container.textContent).toBe('example');
    });
});
