import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "버튼의 스타일 변형을 선택합니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["huge", "extraLarge", "large", "medium", "small", "extraSmall", "tiny"],
      description: "버튼의 크기입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "huge" },
      },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "success", "warning"],
      description: "버튼의 색상입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    style: {
      control: { type: "select" },
      options: ["filled", "outlined"],
      description: "버튼의 스타일 타입입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "filled" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 상태입니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: { type: "text" },
      description: "버튼 내부 텍스트 또는 요소입니다.",
    },
    onClick: { action: "clicked", table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본(Default) 버튼
 * 주요 액션에 사용하는 기본 버튼입니다. 모든 props를 조절해볼 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: "default",
    size: "huge",
    color: "primary",
    style: "filled",
    children: "Button",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 버튼입니다. 앱 내 주요 액션에 사용하세요. variant, size, color, style을 선택해서 다양한 조합을 만들 수 있습니다.",
      },
    },
  },
};

/**
 * 파괴적(Destructive) 버튼
 * 데이터 삭제 등 되돌릴 수 없는 액션에 사용합니다.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "huge",
    children: "Delete",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "데이터 삭제 등 되돌릴 수 없는 위험한 액션에 사용합니다. 사용자에게 위험성을 명확히 전달합니다.",
      },
    },
  },
};

/**
 * 아웃라인(Outline) 버튼
 * 경계선만 있는 아웃라인 스타일입니다. 보조 액션에 적합합니다.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    size: "huge",
    children: "Outline Button",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "경계선만 있는 아웃라인 스타일 버튼입니다. 주요 액션 옆의 보조 액션에 적합합니다.",
      },
    },
  },
};

/**
 * Secondary 버튼
 * Secondary 색상으로 강조되는 보조 액션 버튼입니다.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "huge",
    children: "Secondary Button",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary 색상의 버튼으로, 주요 액션 다음 우선순위의 액션에 사용합니다.",
      },
    },
  },
};

/**
 * Ghost 버튼
 * 배경색 없이 텍스트만 표시되는 버튼입니다. 최소 강조가 필요할 때 사용합니다.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "huge",
    children: "Ghost Button",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "배경색 없이 텍스트만 표시되며 hover 시에만 강조됩니다. 메뉴나 링크 같은 최소 강조 액션에 사용하세요.",
      },
    },
  },
};

/**
 * Link 버튼
 * 텍스트 링크처럼 표시되는 버튼입니다.
 */
export const Link: Story = {
  args: {
    variant: "link",
    size: "huge",
    children: "Learn more →",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "텍스트 링크처럼 표시되며 hover 시 밑줄이 표시됩니다. 페이지 내 링크나 추가 정보 링크에 사용하세요.",
      },
    },
  },
};

/**
 * 크기(Size) 비교
 * 모든 크기 옵션을 한눈에 비교할 수 있습니다.
 */
export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>huge</span>
        <Button {...args} size="huge">
          Huge
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>extraLarge</span>
        <Button {...args} size="extraLarge">
          Extra Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>large</span>
        <Button {...args} size="large">
          Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>medium</span>
        <Button {...args} size="medium">
          Medium
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>small</span>
        <Button {...args} size="small">
          Small
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>extraSmall</span>
        <Button {...args} size="extraSmall">
          Extra Small
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "80px" }}>tiny</span>
        <Button {...args} size="tiny">
          Tiny
        </Button>
      </div>
    </div>
  ),
  args: {
    variant: "default",
    color: "primary",
    style: "filled",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 크기 옵션(huge, extraLarge, large, medium, small, extraSmall, tiny)을 비교합니다.",
      },
    },
  },
};

/**
 * 색상(Color) 비교
 * 모든 색상 옵션을 한눈에 확인할 수 있습니다.
 */
export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
    </div>
  ),
  args: {
    variant: "default",
    size: "huge",
    style: "filled",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "모든 색상 옵션(primary, secondary, success, warning, error)을 비교합니다.",
      },
    },
  },
};

/**
 * Filled vs Outlined 스타일 비교
 * 같은 색상에서 filled와 outlined 스타일을 비교합니다.
 */
export const FillVsOutline: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: "12px", fontWeight: 600 }}>Filled</span>
        <Button {...args} style="filled" color="primary">
          Primary
        </Button>
        <Button {...args} style="filled" color="secondary">
          Secondary
        </Button>
        <Button {...args} style="filled" color="success">
          Success
        </Button>
        <Button {...args} style="filled" color="warning">
          Warning
        </Button>
        <Button {...args} style="filled" color="error">
          Error
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: "12px", fontWeight: 600 }}>Outlined</span>
        <Button {...args} style="outlined" color="primary">
          Primary
        </Button>
        <Button {...args} style="outlined" color="secondary">
          Secondary
        </Button>
        <Button {...args} style="outlined" color="success">
          Success
        </Button>
        <Button {...args} style="outlined" color="warning">
          Warning
        </Button>
        <Button {...args} style="outlined" color="error">
          Error
        </Button>
      </div>
    </div>
  ),
  args: {
    variant: "default",
    size: "huge",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Filled와 Outlined 스타일을 색상별로 비교합니다.",
      },
    },
  },
};

/**
 * 비활성화(Disabled) 상태
 * 비활성화된 버튼의 모습을 보여줍니다.
 */
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button {...args} variant="default" disabled>
        Default
      </Button>
      <Button {...args} variant="destructive" disabled>
        Destructive
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost
      </Button>
      <Button {...args} variant="link" disabled>
        Link
      </Button>
    </div>
  ),
  args: {
    size: "huge",
    color: "primary",
    style: "filled",
  },
  parameters: {
    docs: {
      description: {
        story:
          "비활성화 상태의 버튼입니다. 불가능한 액션을 표시할 때 사용하세요. 시각적으로 구분되며 클릭이 불가능합니다.",
      },
    },
  },
};

/**
 * Variant 전체 비교
 * 모든 variant를 색상별로 비교합니다.
 */
export const AllVariants: Story = {
  render: () => {
    const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
    const colors = ["primary", "secondary", "success", "warning", "error"] as const;

    return (
      <div style={{ display: "grid", gap: 20 }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>{variant}</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {colors.map((color) => (
                <Button
                  key={`${variant}-${color}`}
                  variant={variant}
                  color={color}
                  size="huge"
                  onClick={fn()}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "모든 variant와 color 조합을 보여주는 종합 테스트입니다.",
      },
    },
  },
};

/**
 * 완전한 매트릭스
 * Variant × Size × Color × Style 모든 조합을 확인할 수 있습니다.
 */
export const CompleteMatrix: Story = {
  render: () => {
    const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
    const sizes = ["huge", "extraLarge", "large", "medium", "small", "extraSmall", "tiny"] as const;
    const colors = ["primary", "secondary", "success", "warning", "error"] as const;

    return (
      <div style={{ display: "grid", gap: 24 }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>{variant}</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {sizes.map((size) => (
                <div
                  key={`${variant}-${size}`}
                  style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}
                >
                  <span
                    style={{ fontSize: "12px", color: "#666", minWidth: "70px", fontWeight: 600 }}
                  >
                    {size}
                  </span>
                  {colors.map((color) => (
                    <Button
                      key={`${variant}-${size}-${color}`}
                      variant={variant}
                      size={size}
                      color={color}
                      onClick={fn()}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 variant, size, color 조합을 매트릭스 형식으로 표시합니다. 버튼 컴포넌트의 주요 상태들을 한눈에 확인할 수 있습니다.",
      },
    },
  },
};
