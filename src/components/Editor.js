import {
    RichTextEditor,
    Link,
    useRichTextEditorContext,
} from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Spoiler } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import { IconColorPicker, IconStar } from '@tabler/icons-react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import jsLanguageSyntax from 'highlight.js/lib/languages/javascript';

// register languages that your are planning to use
lowlight.registerLanguage('ts', tsLanguageSyntax);
lowlight.registerLanguage('js', jsLanguageSyntax);

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function InsertStarControl() {
    const { editor } = useRichTextEditorContext();
    return (
        <RichTextEditor.Control
            onClick={() => editor?.commands.insertContent('⭐')}
            aria-label="Insert star emoji"
            title="Insert star emoji"
        >
            <IconStar stroke={1.5} size="1rem" />
        </RichTextEditor.Control>
    );
}

export default function Editor({
    content = '',
    toolbar = true,
    editable = true,
    onUpdate,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TextStyle,
            Color,
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        editable,
        content,
        onUpdate,
    });

    useDidUpdate(() => {
        if (editor && !editor.getText() && content) {
            editor.commands.setContent(content);
        }
    }, [content]);

    return (
        <RichTextEditor
            editor={editor}
            sx={(theme) =>
                editable
                    ? {}
                    : {
                          border: 'none',
                      }
            }
        >
            {toolbar && (
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.CodeBlock />
                        <InsertStarControl />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ColorPicker
                        colors={[
                            '#25262b',
                            '#868e96',
                            '#fa5252',
                            '#e64980',
                            '#be4bdb',
                            '#7950f2',
                            '#4c6ef5',
                            '#228be6',
                            '#15aabf',
                            '#12b886',
                            '#40c057',
                            '#82c91e',
                            '#fab005',
                            '#fd7e14',
                        ]}
                    />

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Control interactive={false}>
                            <IconColorPicker size="1rem" stroke={1.5} />
                        </RichTextEditor.Control>
                        <RichTextEditor.Color color="#F03E3E" />
                        <RichTextEditor.Color color="#7048E8" />
                        <RichTextEditor.Color color="#1098AD" />
                        <RichTextEditor.Color color="#37B24D" />
                        <RichTextEditor.Color color="#F59F00" />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.UnsetColor />
                </RichTextEditor.Toolbar>
            )}

            <Spoiler
                maxHeight={editable ? 'auto' : 120}
                showLabel="Show more"
                hideLabel="Hide"
            >
                <RichTextEditor.Content
                    spellCheck={false}
                    sx={(theme) => ({
                        backgroundColor: editable ? '' : 'transparent',

                        '.ProseMirror': editable
                            ? {}
                            : {
                                  padding: 0,
                              },
                    })}
                />
            </Spoiler>
        </RichTextEditor>
    );
}
