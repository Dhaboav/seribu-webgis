import { Accordion, AccordionContent, AccordionItem, AccordionItemWrapper, AccordionTrigger } from '@/components/ui/accordion';

type AnswerItem = {
    image: string;
    time: string;
    trash: string;
};

type DataItem = {
    question: string;
    answer: AnswerItem[];
};

interface AppDataProps {
    data: DataItem[];
}

export default function AppData({ data }: AppDataProps) {
    return (
        <Accordion type="single" collapsible defaultValue="" className="w-full bg-gray-600">
            {data.map(({ question, answer }) => (
                <AccordionItem key={question} value={question} className="group border-b border-gray-200 last:border-b-0">
                    <AccordionItemWrapper>
                        <AccordionTrigger className="w-full p-4 text-left text-white">{question}</AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            <div className="max-h-80 space-y-0 divide-y divide-gray-600 overflow-y-auto px-4 py-2">
                                {answer.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 py-3 text-gray-200">
                                        <img src={`/storage/${item.image}`} alt="snapshot" className="h-16 w-16 rounded-md object-cover" />
                                        <div className="flex w-full max-w-xs flex-col space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-300">Jam:</span>
                                                <span className="font-medium text-white">{item.time} WIB</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-300">Sampah:</span>
                                                <span className="text-white">{item.trash}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItemWrapper>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
