import React from "react";
import { Card, CardContent } from "../ui/card";

type ShopInfoProps = {
  shopId: string;
  shopName: string;
  description?: string;
  isShopOwner?: boolean;
  ownerName: string;
  shopOwnerUserId: string;
  isPending?: boolean;
};

const ShopInfo = ({
  shopId,
  ownerName,
  shopName,
  isShopOwner = false,
  isPending,
}: ShopInfoProps) => {
  return (
    <div className="w-full">
      <Card className="shadow-custom rounded-[8px] mb-3 border-none">
        <CardContent className="p-3 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopInfo;
