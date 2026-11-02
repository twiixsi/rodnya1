import { BenefitCalculationInput, BenefitCalculationResult } from '@/types';
import { MOCK_BENEFITS } from '@/lib/supabase/mock-data';

// Базовые социально-экономические нормативы Республики Беларусь (2026/2027)
export const BELARUS_ECONOMIC_CONSTANTS = {
  BPM: 437.80, // Бюджет прожиточного минимума в среднем на душу населения (BYN)
  SZP: 2415.70, // Среднемесячная заработная плата работников в республике (BYN)
  FAMILY_CAPITAL_AMOUNT: 31426.00, // Размер семейного капитала (BYN)
};

export function calculateBelarusFamilyBenefits(input: BenefitCalculationInput): BenefitCalculationResult {
  const {
    children_count,
    child_order,
    has_child_under_3,
    has_child_disability,
    average_monthly_income_per_capita,
  } = input;

  const matched_benefits: BenefitCalculationResult['matched_benefits'] = [];
  let lump_sum_total = 0;
  let monthly_total = 0;
  let family_capital = 0;

  // 1. Единовременное пособие в связи с рождением
  const birthBenefit = child_order === 1
    ? MOCK_BENEFITS.find(b => b.code === 'BEN-01')
    : MOCK_BENEFITS.find(b => b.code === 'BEN-02');

  if (birthBenefit) {
    const amount = child_order === 1
      ? 10 * BELARUS_ECONOMIC_CONSTANTS.BPM // 4378.00 BYN
      : 14 * BELARUS_ECONOMIC_CONSTANTS.BPM; // 6129.20 BYN

    lump_sum_total += amount;
    matched_benefits.push({
      benefit: birthBenefit,
      amount_byn: amount,
      period: 'единовременно',
      note: child_order === 1 ? '10 БПМ на первого ребёнка' : '14 БПМ на второго и последующих детей',
      qualification_reason: 'Гарантировано статьёй 10 Закона Республики Беларусь № 7-З'
    });
  }

  // 2. Пособие за постановку на учет до 12 недель (100% БПМ)
  const prenatalBenefit = MOCK_BENEFITS.find(b => b.code === 'BEN-06');
  if (prenatalBenefit) {
    const amount = 1.0 * BELARUS_ECONOMIC_CONSTANTS.BPM;
    lump_sum_total += amount;
    matched_benefits.push({
      benefit: prenatalBenefit,
      amount_byn: amount,
      period: 'единовременно',
      note: '100% БПМ при своевременном медицинском наблюдении в женской консультации',
      qualification_reason: 'Статья 9 Закона РБ № 7-З'
    });
  }

  // 3. Ежемесячное пособие по уходу за ребенком до 3 лет
  if (has_child_under_3 || child_order >= 1) {
    const isFirst = child_order === 1 && children_count <= 1;
    let percent = isFirst ? 0.35 : 0.40;
    if (has_child_disability) {
      percent = 0.45;
    }

    const monthlyAmount = Math.round(percent * BELARUS_ECONOMIC_CONSTANTS.SZP * 100) / 100;
    monthly_total += monthlyAmount;

    const careBenefit = isFirst
      ? MOCK_BENEFITS.find(b => b.code === 'BEN-03')
      : MOCK_BENEFITS.find(b => b.code === 'BEN-04');

    if (careBenefit) {
      matched_benefits.push({
        benefit: careBenefit,
        amount_byn: monthlyAmount,
        period: 'ежемесячно до 3 лет',
        note: has_child_disability 
          ? '45% СЗП (на ребёнка с инвалидностью)' 
          : isFirst ? '35% СЗП на первого ребёнка' : '40% СЗП на второго и последующих',
        qualification_reason: 'Статья 13 Закона Республики Беларусь № 7-З'
      });
    }
  }

  // 4. Семейный капитал при рождении 3-го и последующих детей
  if (child_order >= 3 || children_count >= 3) {
    family_capital = BELARUS_ECONOMIC_CONSTANTS.FAMILY_CAPITAL_AMOUNT;
    const capitalBenefit = MOCK_BENEFITS.find(b => b.code === 'BEN-05');
    if (capitalBenefit) {
      matched_benefits.push({
        benefit: capitalBenefit,
        amount_byn: family_capital,
        period: 'безналичные целевые средства',
        note: '31 426 BYN на депозит в ОАО «АСБ Беларусбанк» с ежегодной капитализацией',
        qualification_reason: 'Указ Президента Республики Беларусь № 345 «О семейном капитале»'
      });
    }

    // Скидка 50% на питание в детском саду
    const foodBenefit = MOCK_BENEFITS.find(b => b.code === 'BEN-09');
    if (foodBenefit) {
      matched_benefits.push({
        benefit: foodBenefit,
        amount_byn: 135.00,
        period: 'ежемесячная экономия',
        note: 'Скидка 50% на оплату питания в учреждениях дошкольного образования',
        qualification_reason: 'Постановление Совета Министров Республики Беларусь'
      });
    }
  }

  // 5. Пособие на детей от 3 до 18 лет в период ухода за ребенком до 3 лет
  const olderChildrenCount = Math.max(0, children_count - 1);
  if (has_child_under_3 && olderChildrenCount > 0) {
    const olderBenefit = MOCK_BENEFITS.find(b => b.code === 'BEN-07');
    if (olderBenefit) {
      const amountPerChild = 0.5 * BELARUS_ECONOMIC_CONSTANTS.BPM;
      const totalOlderAmount = amountPerChild * olderChildrenCount;
      monthly_total += totalOlderAmount;
      matched_benefits.push({
        benefit: olderBenefit,
        amount_byn: totalOlderAmount,
        period: 'ежемесячно',
        note: `50% БПМ (${amountPerChild.toFixed(2)} BYN) × ${olderChildrenCount} ст. реб.`,
        qualification_reason: 'Статья 14 Закона РБ № 7-З'
      });
    }
  }

  // 6. Адресная социальная помощь / бесплатное питание до 2 лет
  if (average_monthly_income_per_capita !== undefined && average_monthly_income_per_capita < BELARUS_ECONOMIC_CONSTANTS.BPM) {
    const foodAssistance = MOCK_BENEFITS.find(b => b.code === 'BEN-10');
    if (foodAssistance) {
      monthly_total += 310.00;
      matched_benefits.push({
        benefit: foodAssistance,
        amount_byn: 310.00,
        period: 'ежемесячно продуктами питания',
        note: 'Бесплатное обеспечение адаптированными смесями и детским питанием «Беллакт»',
        qualification_reason: 'Указ Президента РБ № 41 «О государственной адресной социальной помощи»'
      });
    }
  }

  return {
    lump_sum_total_byn: Math.round(lump_sum_total * 100) / 100,
    monthly_total_byn: Math.round(monthly_total * 100) / 100,
    family_capital_byn: family_capital,
    calculated_at: new Date().toISOString(),
    matched_benefits
  };
}
