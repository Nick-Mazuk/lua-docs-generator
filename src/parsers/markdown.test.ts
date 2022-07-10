import { generateMethodMarkdown, generateTocMarkdown } from './markdown'

it('generates markdown from method title', () => {
    expect(
        generateMethodMarkdown({
            name: 'chromatic_transposition',
            description: [],
            parameters: [],
        })
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'chromatic_transposition()',
            '```',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

it('generates markdown from method title and module name', () => {
    expect(
        generateMethodMarkdown(
            {
                name: 'chromatic_transposition',
                description: [],
                parameters: [],
            },
            'transposition'
        )
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'transposition.chromatic_transposition()',
            '```',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

it('generates markdown from method with description', () => {
    expect(
        generateMethodMarkdown(
            {
                name: 'chromatic_transposition',
                description: ['I am a description', '', 'I span two paragraphs'],
                parameters: [],
            },
            'transposition'
        )
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'transposition.chromatic_transposition()',
            '```',
            '',
            'I am a description',
            '',
            'I span two paragraphs',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

it('removes excess empty lines from description', () => {
    expect(
        generateMethodMarkdown(
            {
                name: 'chromatic_transposition',
                description: [
                    '',
                    '',
                    '',
                    '',
                    'I am a description',
                    '',
                    '',
                    'I span two paragraphs',
                    'continuation of paragraph',
                    '',
                    '',
                    '',
                    'another paragraph',
                    '',
                ],
                parameters: [],
            },
            'transposition'
        )
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'transposition.chromatic_transposition()',
            '```',
            '',
            'I am a description',
            '',
            'I span two paragraphs',
            'continuation of paragraph',
            '',
            'another paragraph',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

it('generates markdown from method with parameters', () => {
    expect(
        generateMethodMarkdown({
            name: 'chromatic_transposition',
            description: [],
            parameters: [
                {
                    name: 'arg1',
                    type: 'string',
                    isOptional: false,
                    description: 'Text of the first parameter',
                },
                {
                    name: 'arg2',
                    type: 'string',
                    isOptional: true,
                    description: 'Text of the first parameter',
                },
            ],
        })
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'chromatic_transposition(arg1, arg2)',
            '```',
            '',
            '| Input | Type | Description |',
            '| ----- | ---- | ----------- |',
            '| `arg1` | `string` | Text of the first parameter |',
            '| `arg2` (optional) | `string` | Text of the first parameter |',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

it('generates markdown from method with return value', () => {
    expect(
        generateMethodMarkdown({
            name: 'chromatic_transposition',
            description: [],
            parameters: [],
            returnValue: {
                type: 'string',
                description: 'Text of the return value',
            },
        })
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'chromatic_transposition()',
            '```',
            '',
            '| Return type | Description |',
            '| ----------- | ----------- |',
            '| `string` | Text of the return value |',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

// eslint-disable-next-line max-lines-per-function -- really large objects, simple function
it('generates markdown from method with everything', () => {
    expect(
        generateMethodMarkdown(
            {
                name: 'chromatic_transposition',
                description: ['I am a description', '', 'I span two paragraphs'],
                parameters: [
                    {
                        name: 'arg1',
                        type: 'string',
                        isOptional: false,
                        description: 'Text of the first parameter',
                    },
                    {
                        name: 'arg2',
                        type: 'string',
                        isOptional: true,
                        description: 'Text of the first parameter',
                    },
                ],
                returnValue: {
                    type: 'string',
                    description: 'Text of the return value',
                },
            },
            'transposition'
        )
    ).toStrictEqual({
        markdown: [
            '## chromatic_transposition',
            '',
            '```lua',
            'transposition.chromatic_transposition(arg1, arg2)',
            '```',
            '',
            'I am a description',
            '',
            'I span two paragraphs',
            '',
            '| Input | Type | Description |',
            '| ----- | ---- | ----------- |',
            '| `arg1` | `string` | Text of the first parameter |',
            '| `arg2` (optional) | `string` | Text of the first parameter |',
            '',
            '| Return type | Description |',
            '| ----------- | ----------- |',
            '| `string` | Text of the return value |',
        ].join('\n'),
        header: 'chromatic_transposition',
        moduleDefinition: false,
    })
})

describe('TOC markdown', () => {
    it('parses TOC markdown', () => {
        const toc = [
            {
                name: 'hello world',
                description: [],
                parameters: [],
            },
            {
                name: 'Hello World',
                description: [],
                parameters: [],
            },
        ]
        expect(generateTocMarkdown(toc)).toBe(
            ['- [hello world](#hello-world)', '- [Hello World](#hello-world)'].join('\n')
        )
    })
})
