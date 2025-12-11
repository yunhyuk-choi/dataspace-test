import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { memo } from "react";

interface HeroSectionData {
  id: string;
  title: string;
  description?: string;
  type: string;
  imgUrl?: string;
}

interface HeroSectionProps {
  data?: HeroSectionData;
}

function HeroSection({ data }: HeroSectionProps) {
  return data ? (
    <div className="grid grid-cols-2 gap-16">
      <div className="flex flex-col items-baseline justify-baseline gap-8">
        <Badge>{data.type}</Badge>
        <p className="display-lb">{data.title}</p>
        <p className="body-mm">{data.description}</p>
        <Button variant={"default"}>Contact</Button>
      </div>
      {data.imgUrl ? (
        <Image
          src={data.imgUrl}
          width={400}
          height={267}
          alt={data.title}
          sizes="(max-width: 768px) 100vw, 400px"
          priority
          fetchPriority="high"
          quality={60}
        />
      ) : (
        <div></div>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-16">
      <div className="flex flex-col items-baseline justify-baseline gap-8">
        <Skeleton className="h-5.5 w-10" />
        <Skeleton className="display-lb h-15 w-100" />
        <Skeleton className="body-mms h-8 w-100" />
        <Button variant={"default"} disabled>
          Contact
        </Button>
      </div>
      <Skeleton className="h-50 w-100" />
    </div>
  );
}

export default memo(HeroSection);
