import { Accordion, AccordionContent, AccordionItem, AccordionItemWrapper, AccordionTrigger } from '@/components/ui/accordion';

export default function AppData() {
    return (
        <Accordion type="single" collapsible defaultValue="" className="w-[300px] bg-gray-600">
            {[
                {
                    value: 'item-1',
                    question: 'Apakah ini responsif?',
                    answer: 'Ya, komponen ini responsif dan bisa di-style dengan Tailwind.',
                },
                {
                    value: 'item-2',
                    question: 'Apakah ini accessible?',
                    answer: 'Tentu! Radix UI sudah WAI-ARIA compliant.',
                },
                {
                    value: 'item-3',
                    question: 'Bisa ditambah animasi?',
                    answer: 'Bisa. Sudah include slide up/down animasi via data-state.',
                },
            ].map(({ value, question, answer }, idx, arr) => (
                <AccordionItem key={value} value={value} className="group border-b border-gray-200 last:border-b-0">
                    <AccordionItemWrapper>
                        <AccordionTrigger className="w-full p-4 text-left text-white">{question}</AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            <div className="text-left text-gray-300">{answer}</div>
                        </AccordionContent>
                    </AccordionItemWrapper>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
