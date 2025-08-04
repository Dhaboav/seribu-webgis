<?php

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__)
    ->exclude('vendor');

return (new PhpCsFixer\Config())
    ->setRules([
        '@PSR12' => true,
        'array_indentation' => true,
        'binary_operator_spaces' => ['default' => 'align'],
        'braces' => ['position_after_functions_and_oop_constructs' => 'next'],
        'concat_space' => ['spacing' => 'one'],
        'function_declaration' => ['closure_function_spacing' => 'none'],
        'no_trailing_whitespace' => true,
        'phpdoc_align' => true,
        'phpdoc_no_empty_return' => true,
        'single_blank_line_at_eof' => true,
    ])
    ->setFinder($finder);
